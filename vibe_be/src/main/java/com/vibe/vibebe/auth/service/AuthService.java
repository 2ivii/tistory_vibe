package com.vibe.vibebe.auth.service;

import com.vibe.vibebe.auth.dto.LoginRequest;
import com.vibe.vibebe.auth.dto.LoginResponse;
import com.vibe.vibebe.auth.dto.SignUpRequest;
import com.vibe.vibebe.auth.dto.SignUpResponse;
import com.vibe.vibebe.global.exception.BusinessException;
import com.vibe.vibebe.global.security.CustomUserDetails;
import com.vibe.vibebe.global.security.jwt.JwtTokenProvider;
import com.vibe.vibebe.user.domain.User;
import com.vibe.vibebe.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public SignUpResponse signUp(SignUpRequest request) {
        validateDuplicate(request);

        User user = User.create(
                request.email(),
                passwordEncoder.encode(request.password()),
                request.nickname(),
                request.blogUsername()
        );

        User savedUser = userRepository.save(user);
        return new SignUpResponse(savedUser.getId(), savedUser.getEmail(), savedUser.getNickname(), savedUser.getBlogUsername());
    }

    public LoginResponse login(LoginRequest request) {
        CustomUserDetails userDetails = (CustomUserDetails) authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        ).getPrincipal();

        String accessToken = jwtTokenProvider.generateAccessToken(userDetails);
        User user = userRepository.findByEmail(userDetails.getEmail())
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));

        return new LoginResponse(
                accessToken,
                "Bearer",
                user.getId(),
                user.getEmail(),
                user.getNickname(),
                user.getRole().name()
        );
    }

    private void validateDuplicate(SignUpRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessException(HttpStatus.CONFLICT, "이미 사용 중인 이메일입니다.");
        }
        if (userRepository.existsByNickname(request.nickname())) {
            throw new BusinessException(HttpStatus.CONFLICT, "이미 사용 중인 닉네임입니다.");
        }
        if (userRepository.existsByBlogUsername(request.blogUsername())) {
            throw new BusinessException(HttpStatus.CONFLICT, "이미 사용 중인 블로그 아이디입니다.");
        }
    }
}
