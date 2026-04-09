# Tistory Vibe

티스토리 스타일의 블로그 서비스를 목표로 한 풀스택 프로젝트입니다.

- 프론트엔드: React + Vite + TypeScript
- 백엔드: Spring Boot + Spring Security + JWT + JPA
- 데이터베이스: MySQL

현재 구현 범위는 회원가입/로그인, JWT 인증, 게시글 CRUD, 댓글 작성/조회/삭제, 프론트엔드 API 연동까지 포함합니다.

## 프로젝트 구조

```text
tistory_vibe/
├── vibe_fe/   # React + Vite + TypeScript 프론트엔드
└── vibe_be/   # Spring Boot 백엔드
```

## 주요 기능

### 인증

- 회원가입
- 로그인
- JWT 기반 인증
- 내 정보 조회

### 게시글

- 게시글 작성
- 게시글 목록 조회
- 게시글 상세 조회
- 게시글 수정
- 게시글 삭제

조건:

- 작성/수정/삭제는 로그인한 사용자만 가능
- 수정/삭제는 본인 글만 가능
- 목록 조회는 페이지네이션 지원

### 댓글

- 댓글 작성
- 특정 게시글의 댓글 목록 조회
- 댓글 삭제

조건:

- 댓글 작성은 로그인한 사용자만 가능
- 댓글 삭제는 본인 댓글만 가능

## 기술 스택

### Frontend

- React 18
- Vite
- TypeScript
- React Router
- Axios

### Backend

- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- MySQL
- Lombok

## 실행 방법

### 1. MySQL 준비

MySQL 서버를 실행한 뒤 `vibe_db` 데이터베이스를 생성합니다.

```bash
mysql -uroot -p
```

```sql
CREATE DATABASE IF NOT EXISTS vibe_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### 2. 백엔드 실행

백엔드는 환경변수 기반으로 DB 설정을 읽습니다.

```bash
export DB_URL="jdbc:mysql://127.0.0.1:3306/vibe_db?serverTimezone=Asia/Seoul&characterEncoding=UTF-8"
export DB_USERNAME="root"
export DB_PASSWORD="YOUR_PASSWORD"
```

프로젝트 루트에서:

```bash
cd vibe_be
./gradlew bootRun
```

기본 포트:

- Backend: `http://localhost:8080`

### 3. 프론트엔드 실행

```bash
cd vibe_fe
npm install
npm run dev
```

기본 포트:

- Frontend: `http://localhost:5173`

필요하면 프론트에서 백엔드 주소를 환경변수로 지정할 수 있습니다.

```bash
echo 'VITE_API_BASE_URL=http://localhost:8080' > .env
```

## 환경 변수

### Backend

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

### Frontend

- `VITE_API_BASE_URL`

## API 요약

### 인증

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/users/me`

### 게시글

- `POST /api/posts`
- `GET /api/posts`
- `GET /api/posts/{postId}`
- `PATCH /api/posts/{postId}`
- `DELETE /api/posts/{postId}`

### 댓글

- `POST /api/posts/{postId}/comments`
- `GET /api/posts/{postId}/comments`
- `DELETE /api/comments/{commentId}`

## 인증 방식

- 로그인 성공 시 JWT access token을 발급합니다.
- 프론트엔드는 토큰을 저장한 뒤 Axios 인터셉터로 `Authorization: Bearer {token}` 헤더를 자동으로 붙입니다.
- 백엔드는 `@AuthenticationPrincipal CustomUserDetails`로 로그인 사용자를 식별합니다.

## 데이터 흐름

### 게시글 상세

현재는 아래 방식으로 분리되어 있습니다.

1. `GET /api/posts/{postId}`로 게시글 상세 조회
2. `GET /api/posts/{postId}/comments`로 댓글 목록 조회

이 구조는 현재 규모에서 게시글 본문과 댓글의 책임을 분리하기 쉽고, 댓글만 별도로 새로고침하거나 확장하기 편합니다.

## 프론트엔드 구조

주요 디렉터리:

- `vibe_fe/src/api`: Axios 인스턴스 및 API 함수
- `vibe_fe/src/pages`: 페이지 단위 컴포넌트
- `vibe_fe/src/components`: 재사용 UI 컴포넌트
- `vibe_fe/src/types`: API/도메인 타입 정의
- `vibe_fe/src/hooks`: 인증 세션 등 커스텀 훅
- `vibe_fe/src/utils`: 공통 유틸리티 및 localStorage 처리

현재 프론트엔드는 다음 화면이 API와 연결되어 있습니다.

- 로그인 페이지
- 회원가입 페이지
- 게시글 목록 페이지
- 게시글 상세 페이지
- 게시글 작성 페이지
- 게시글 수정 페이지
- 사용자 블로그 페이지

## 백엔드 구조

주요 패키지:

- `auth`: 회원가입/로그인
- `user`: 사용자 조회
- `post`: 게시글 도메인
- `comment`: 댓글 도메인
- `global/security`: JWT 인증/인가
- `global/exception`: 공통 예외 처리
- `global/common`: 공통 응답/엔티티

구조 원칙:

- Controller / Service / Repository 분리
- Request DTO / Response DTO 분리
- `BusinessException` 기반 예외 처리
- `BaseEntity`의 `createdAt`, `updatedAt` 공통 사용

## 데이터베이스 테이블

현재 JPA로 생성되는 주요 테이블:

- `users`
- `posts`
- `comments`

관계:

- `Post` N : 1 `User`
- `Comment` N : 1 `User`
- `Comment` N : 1 `Post`

## 참고 사항

- 현재는 좋아요, 태그, 카테고리, 대댓글 등 확장 기능은 제외되어 있습니다.
- 댓글은 별도 API로 조회합니다.
- 게시글 삭제 시 관련 댓글도 함께 삭제되도록 처리되어 있습니다.
- 로컬 개발 기준으로 작성되어 있으며, 운영 배포용 설정은 별도로 분리하는 것이 좋습니다.
