package com.vibe.vibebe.global.exception;

public record ErrorResponse(
        String code,
        String message
) {
}
