package com.vibe.vibebe.user.service;

import com.vibe.vibebe.global.exception.BusinessException;
import com.vibe.vibebe.global.security.CustomUserDetails;
import com.vibe.vibebe.user.domain.User;
import com.vibe.vibebe.user.dto.MyInfoResponse;
import com.vibe.vibebe.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public MyInfoResponse getMyInfo(CustomUserDetails userDetails) {
        User user = userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));

        return new MyInfoResponse(
                user.getId(),
                user.getEmail(),
                user.getNickname(),
                user.getBlogUsername(),
                user.getBlogTitle(),
                user.getBio(),
                user.getRole().name()
        );
    }
}
