package meds.bookaroo.authservice.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class JWTLoginResponse {
    private ResponseData data;
    private Boolean success;
    private String error;

    public JWTLoginResponse(String token, Long userId) {
        this.success = true;
        this.data = new ResponseData(token, userId);
        this.error = "";
    }

    public JWTLoginResponse(String error) {
        this.success = false;
        this.data = null;
        this.error = error;
    }

    @AllArgsConstructor
    @Data
    public static class ResponseData {
        public String token;
        public Long userId;
    }
}
