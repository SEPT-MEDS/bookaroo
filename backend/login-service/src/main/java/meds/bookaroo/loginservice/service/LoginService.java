package meds.bookaroo.loginservice.service;

import meds.bookaroo.loginservice.requestDTO.LoginRequestDTO;

import javax.servlet.http.HttpServletRequest;

public interface LoginService {
    String login(LoginRequestDTO requestDTO, HttpServletRequest request);
}