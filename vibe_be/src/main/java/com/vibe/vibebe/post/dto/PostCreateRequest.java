package com.vibe.vibebe.post.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PostCreateRequest(
        @NotBlank(message = "제목은 필수입니다.")
        @Size(max = 150, message = "제목은 150자 이하여야 합니다.")
        String title,

        @NotBlank(message = "요약은 필수입니다.")
        @Size(max = 255, message = "요약은 255자 이하여야 합니다.")
        String summary,

        @NotBlank(message = "본문은 필수입니다.")
        String content
) {
}
