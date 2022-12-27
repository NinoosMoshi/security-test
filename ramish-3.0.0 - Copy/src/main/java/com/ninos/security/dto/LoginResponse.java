package com.ninos.security.dto;

import com.ninos.security.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private String email;
    private String token;
    private List<Role> roles;

    public LoginResponse(String email) {
        this.email = email;
    }


}
