package com.gulnar.bookstore.backend.web.res;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WelcomeController {

    @RequestMapping("login")
    @ResponseBody
    public String loginMessage(){
        return "Hello Gulnar";
    }


}
