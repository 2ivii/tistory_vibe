package com.vibe.vibebe.post.dto;

import java.util.List;
import org.springframework.data.domain.Page;

public record PostPageResponse(
        List<PostSummaryResponse> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean first,
        boolean last
) {

    public static PostPageResponse from(Page<PostSummaryResponse> page) {
        return new PostPageResponse(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isFirst(),
                page.isLast()
        );
    }
}
