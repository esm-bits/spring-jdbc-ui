package jp.co.esm.its.spring.jdbc.ui.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class IndexController {

    @RequestMapping(path = ["/"])
    fun index(): String {
        return "app"
    }
}