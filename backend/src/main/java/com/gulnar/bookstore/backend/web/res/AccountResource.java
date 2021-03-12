package nl.eonics.jigler.web.rest;

import java.time.ZonedDateTime;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepositoryCustom userRepositoryCustom;
    private final UserServiceCustom userServiceCustom;
    private final MailServiceCustom mailServiceCustom;
    private final ConnectionServiceCustom connectionServiceCustom;
    private final UserModelMapper userModelMapper;
    private final UserExtRepository userExtRepository;
    private final SearchSubscriptionRepositoryCustom searchSubscriptionRepositoryCustom;

    public AccountResource(
            UserRepositoryCustom userRepositoryCustom,
            UserServiceCustom userServiceCustom,
            MailServiceCustom mailServiceCustom,
            ConnectionServiceCustom connectionServiceCustom,
            UserModelMapper userModelMapper,
            UserExtRepository userExtRepository,
            SearchSubscriptionRepositoryCustom searchSubscriptionRepositoryCustom
    ) {
        this.userRepositoryCustom = userRepositoryCustom;
        this.userServiceCustom = userServiceCustom;

        this.connectionServiceCustom = connectionServiceCustom;
        this.userModelMapper = userModelMapper;
        this.userExtRepository = userExtRepository;
        this.searchSubscriptionRepositoryCustom = searchSubscriptionRepositoryCustom;
    }

    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password)
                && password.length() >= ManagedUserVM.PASSWORD_MIN_LENGTH
                && password.length() <= ManagedUserVM.PASSWORD_MAX_LENGTH;
    }


    @PostMapping("/register")
    @Timed
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody UserModel userModel) {



        if (!(checkPasswordLength(userModel.getPassword()))) {
            throw new InvalidPasswordException();
        }
        UserExt userExt = userServiceCustom.registerUser(
                userModel,
                generateSearchText(userModel)
        );




        log.info("Register complete.");
    }









}
