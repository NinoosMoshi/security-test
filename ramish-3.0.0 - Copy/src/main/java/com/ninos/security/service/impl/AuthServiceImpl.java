package com.ninos.security.service.impl;

import com.ninos.security.dto.AccountResponse;
import com.ninos.security.dto.LoginDTO;
import com.ninos.security.dto.LoginResponse;
import com.ninos.security.dto.RegisterDTO;
import com.ninos.security.entity.Role;
import com.ninos.security.entity.User;
import com.ninos.security.exception.ProductAPIException;
import com.ninos.security.jwt.JwtTokenProvider;
import com.ninos.security.repository.RoleRepository;
import com.ninos.security.repository.UserRepository;
import com.ninos.security.service.AuthService;
import com.ninos.security.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RoleService roleService;


    @Override
    public LoginResponse login(LoginDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsernameOrEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        LoginResponse loginResponse = new LoginResponse();

        User user = userRepository.findByUsernameOrEmail(loginDTO.getUsernameOrEmail(),loginDTO.getUsernameOrEmail()).get();

        List<Role> roles = getRoleList(user);

        String token = jwtTokenProvider.generateToken(authentication);

        return new LoginResponse(user.getEmail(), token, roles);
    }


    private List<Role> getRoleList(User user){
        List<Role> roleList = new ArrayList<>();
        for(int i=0; i< user.getRoles().size(); i++) {
            Role roleModel = new Role();
            roleModel.setName(user.getRoles().get(i).getName());
            roleList.add(roleModel);
        }
        return roleList;
    }



//    @Override
//    public String register(RegisterDTO registerDTO) {
//
//        // check username is exists in database
//        if (userRepository.existsByUsername(registerDTO.getUsername())){
//            throw new ProductAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!");
//        }
//
//        if (userRepository.existsByEmail(registerDTO.getEmail())){
//            throw new ProductAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!");
//        }
//
//        User user = new User();
//        user.setName(registerDTO.getName());
//        user.setUsername(registerDTO.getUsername());
//        user.setEmail(registerDTO.getEmail());
//        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
//
//        Set<Role> roles = new HashSet<>();
//        Role userRole = roleRepository.findByName("ROLE_USER").get();
//        roles.add(userRole);
//        user.setRoles((List<Role>) roles);
//
//        userRepository.save(user);
//
//        return "User Registered successfully!.";
//    }


    @Override
    public AccountResponse register(RegisterDTO registerDTO) {

        AccountResponse accountResponse = new AccountResponse();

        // check username is exists in database
        if (userRepository.existsByUsername(registerDTO.getUsername())){
            accountResponse.setResult(0);
            throw new ProductAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!");
        }

        if (userRepository.existsByEmail(registerDTO.getEmail())){
            accountResponse.setResult(0);
            throw new ProductAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!");
        }

        User user = new User();
        user.setName(registerDTO.getName());
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.getRoles().add(roleService.getAllRoles().get(1));

        userRepository.save(user);
        accountResponse.setResult(1);

        return accountResponse;
    }






}
