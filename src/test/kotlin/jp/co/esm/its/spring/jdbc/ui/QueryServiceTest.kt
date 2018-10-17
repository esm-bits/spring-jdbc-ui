package jp.co.esm.its.spring.jdbc.ui

import jp.co.esm.its.spring.jdbc.ui.model.QueryRequest
import org.hamcrest.Matchers.*
import org.junit.Assert.assertThat
import org.junit.Test
import org.junit.runner.RunWith

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.jdbc.SqlGroup
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest
class QueryServiceTest {

    @Autowired
    lateinit var queryService: QueryService

    @Test
    @SqlGroup(value = [Sql("QueryServiceTest.clear.sql"), Sql()])
    fun executeSelectStatement() {
        val request = QueryRequest("select * from users;", emptyList())
        val result = queryService.execute(request)
        assertThat(result?.updateCount, equalTo(-1))
        assertThat(result?.columns, hasSize(2))
        assertThat(result?.columns!![0].label, equalToIgnoringCase("id"))
        assertThat(result.columns!![0].typeName, equalTo("INTEGER"))
        assertThat(result.columns!![1].label, equalToIgnoringCase("name"))
        assertThat(result.columns!![1].typeName, equalTo("VARCHAR"))
        assertThat(result.resultSet, hasSize(1))
        assertThat(result.resultSet!![0]["ID"] as Int, equalTo(1))
        assertThat(result.resultSet!![0]["NAME"] as String, equalTo("Foo"))
    }

    @Test
    @Sql("QueryServiceTest.clear.sql")
    fun executeInsertStatement() {
        val request = QueryRequest("insert into users (id, name) values (10, 'fossamagna');", emptyList())
        val result = queryService.execute(request)
        assertThat(result?.updateCount, equalTo(1))
        assertThat(result?.columns, `is`(nullValue()))
        assertThat(result?.resultSet, `is`(nullValue()))
    }

    @Test
    @SqlGroup(value = [Sql("QueryServiceTest.clear.sql"), Sql()])
    fun executeUpdateStatement() {
        val request = QueryRequest("update users set name = 'fossamagna' where id = 1;", emptyList())
        val result = queryService.execute(request)
        assertThat(result?.updateCount, equalTo(1))
        assertThat(result?.columns, `is`(nullValue()))
        assertThat(result?.resultSet, `is`(nullValue()))
    }

    @Test
    @SqlGroup(value = [Sql("QueryServiceTest.clear.sql"), Sql()])
    fun executeDeleteStatement() {
        val request = QueryRequest("delete from users;", emptyList())
        val result = queryService.execute(request)
        assertThat(result?.updateCount, equalTo(1))
        assertThat(result?.columns, `is`(nullValue()))
        assertThat(result?.resultSet, `is`(nullValue()))
    }
}