package meds.bookaroo.loginservice.service.serviceImpl;

import meds.bookaroo.loginservice.constants.ErrorMessageConstants;
import meds.bookaroo.loginservice.constants.PatternConstants;
import meds.bookaroo.loginservice.exceptions.UnauthorisedException;
import meds.bookaroo.loginservice.feignInterface.UserInterface;
import meds.bookaroo.loginservice.requestDTO.LoginRequestDTO;
import meds.bookaroo.loginservice.requestDTO.UserRequestDTO;
import meds.bookaroo.loginservice.responseDTO.UserResponseDTO;
import meds.bookaroo.loginservice.service.LoginService;
import meds.bookaroo.loginservice.jwt.JwtTokenProvider;
import meds.bookaroo.loginservice.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional("transactionManager")
public class LoginServiceImpl implements LoginService {
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserInterface userInterface;

    @Override
    public String login(LoginRequestDTO requestDTO, HttpServletRequest request) {
        long startTime = DateUtils.getTimeInMillisecondsFromLocalDate();

        UserResponseDTO user = fetchUserDetails.apply(requestDTO);

        validateUserUsername.accept(user);
        validatePassword.accept(requestDTO, user);

        String jwtToken = jwtTokenProvider.createToken(requestDTO.getUserCredential(), request);
        System.out.println(jwtToken);
        return jwtToken;
    }

    private Function<LoginRequestDTO, UserResponseDTO> fetchUserDetails = (loginRequestDTO) -> {

        Pattern pattern = Pattern.compile(PatternConstants.EmailConstants.EMAIL_PATTERN);
        Matcher m = pattern.matcher(loginRequestDTO.getUserCredential());

        return m.find() ? userInterface.getUserWithUsername
                (new UserRequestDTO(loginRequestDTO.getUserCredential()))
                : userInterface.getUserWithUsername
                (new UserRequestDTO(loginRequestDTO.getUserCredential()));
    };

    private Consumer<UserResponseDTO> validateUserUsername = (user) -> {
        if (Objects.isNull(user))
            throw new UnauthorisedException(ErrorMessageConstants.InvalidUserUsername.MESSAGE);
    };

    private BiConsumer<LoginRequestDTO, UserResponseDTO> validatePassword = (requestDTO, user) -> {
        if (!BCrypt.checkpw(requestDTO.getPassword(), user.getPassword())) {
            throw new UnauthorisedException(ErrorMessageConstants.InvalidPassword.MESSAGE);
        }
    };

}