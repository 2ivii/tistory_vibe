package com.vibe.vibebe.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SignUpRequest(
        @NotBlank(message = "이메일은 필수입니다.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        String email,

        @NotBlank(message = "비밀번호는 필수입니다.")
        @Size(min = 8, max = 20, message = "비밀번호는 8자 이상 20자 이하여야 합니다.")
        String password,

        @NotBlank(message = "닉네임은 필수입니다.")
        @Size(min = 2, max = 30, message = "닉네임은 2자 이상 30자 이하여야 합니다.")
        String nickname,

        @NotBlank(message = "블로그 아이디는 필수입니다.")
        @Size(min = 3, max = 50, message = "블로그 아이디는 3자 이상 50자 이하여야 합니다.")
        @Pattern(regexp = "^[a-z0-9_-]+$", message = "블로그 아이디는 영문 소문자, 숫자, _, - 만 사용할 수 있습니다.")
        String blogUsername
) {
}
