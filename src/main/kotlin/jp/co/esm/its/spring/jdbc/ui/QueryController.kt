package jp.co.esm.its.spring.jdbc.ui

import jp.co.esm.its.spring.jdbc.ui.model.QueryRequest
import jp.co.esm.its.spring.jdbc.ui.model.QueryResult
import java.util.HashMap
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


/**
 * REST controller for SQL execution request message.
 *
 * @author fossamagna
 */
@RestController
@RequestMapping("\${jp.co.esm.its.spring.jdbc.ui.path:/jdbc-ui}/api/query")
class QueryController(service: QueryService) {

    private val service: QueryService = service

    @RequestMapping(method = [RequestMethod.POST], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun execute(@RequestBody request: QueryRequest): ResponseEntity<QueryResult> {
        val body = service.execute(request)
        return ResponseEntity(body, HttpStatus.OK)
    }

    @ExceptionHandler(Throwable::class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    fun handleError(e: Throwable): Map<String, Any> {
        val errorMap = HashMap<String, Any>()
        val message = e.message
        if (message != null) {
            errorMap["message"] = message
        }
        return errorMap
    }
}
