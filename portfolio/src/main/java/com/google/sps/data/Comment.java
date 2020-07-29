package com.google.sps.data;

public final class Comment{
    private final long id;
    private final String commentInput;
    private final long timestamp;
    private final String email;

    public Comment(long id, String commentInput, long timestamp, String email){
        this.id = id;
        this.commentInput = commentInput;
        this.timestamp = timestamp;
        this.email = email;
    }
}