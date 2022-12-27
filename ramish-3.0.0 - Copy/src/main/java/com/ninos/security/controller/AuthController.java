package com.ninos.security.controller;

import com.ninos.security.dto.AccountResponse;
import com.ninos.security.dto.LoginDTO;
import com.ninos.security.dto.LoginResponse;
import com.ninos.security.dto.RegisterDTO;
import com.ninos.security.jwt.JwtAuthResponse;
import com.ninos.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    // build login API
//    @PostMapping(value = {"/login", "/sign-in"})
//    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDTO loginDTO){
//
//        String token = authService.login(loginDTO);
//
//        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
//        jwtAuthResponse.setAccessToken(token);
//        jwtAuthResponse.setEmail(loginDTO.getUsernameOrEmail());
//
//        return ResponseEntity.ok(jwtAuthResponse);
//    }

    // build login API
    @PostMapping(value = {"/login", "/sign-in"})
    public LoginResponse login(@RequestBody LoginDTO loginDTO){
        return authService.login(loginDTO);
    }






    // build Register API
//    @PostMapping(value = {"/register", "/sign-up"})
//    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){
//        String register = authService.register(registerDTO);
//        return new ResponseEntity<>(register, HttpStatus.CREATED);
//    }


    @PostMapping(value = {"/register", "/sign-up"})
    public ResponseEntity<AccountResponse> register(@RequestBody RegisterDTO registerDTO){

        AccountResponse register = authService.register(registerDTO);

        return new ResponseEntity<>(register, HttpStatus.CREATED);
    }



}
