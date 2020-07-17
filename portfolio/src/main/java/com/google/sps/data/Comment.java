package com.google.sps.data;

public final class Comment{
    private final long id;
    private final String commentInput;
    private final long timestamp;

    public Comment(long id, String commentInput, long timestamp){
        this.id = id;
        this.commentInput = commentInput;
        this.timestamp = timestamp;
    }
}