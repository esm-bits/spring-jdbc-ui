package jp.co.esm.its.spring.jdbc.ui

import jp.co.esm.its.spring.jdbc.ui.model.Column
import jp.co.esm.its.spring.jdbc.ui.model.Parameter
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import java.util.stream.Collectors
import org.springframework.jdbc.core.namedparam.EmptySqlParameterSource
import jp.co.esm.its.spring.jdbc.ui.model.QueryRequest
import org.springframework.jdbc.core.namedparam.SqlParameterSource
import org.springframework.jdbc.core.ColumnMapRowMapper
import org.springframework.jdbc.core.RowMapperResultSetExtractor
import jp.co.esm.its.spring.jdbc.ui.model.QueryResult
import java.sql.ResultSet
import org.springframework.core.convert.ConversionService
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations
import org.springframework.jdbc.support.JdbcUtils
import org.springframework.stereotype.Service
import java.sql.PreparedStatement


@Service
class QueryService(jdbcOperations: NamedParameterJdbcOperations, conversionService: ConversionService) {
    private val jdbcOperations: NamedParameterJdbcOperations = jdbcOperations
    private val conversionService: ConversionService = conversionService

    fun execute(request: QueryRequest): QueryResult? {
        val callback = { ps: PreparedStatement ->
            var rs: ResultSet? = null
            try {
                ps.execute()
                val updateCount = ps.updateCount
                var columns: List<Column>? = null
                var resultSet: List<Map<String, Any>>? = null
                if (updateCount == -1) {
                    rs = ps.resultSet
                    val metadata = rs!!.metaData
                    columns = Column.getColumns(metadata)
                    resultSet = RowMapperResultSetExtractor(ColumnMapRowMapper()).extractData(rs)
                }
                QueryResult(updateCount, columns, resultSet)
            } finally {
                JdbcUtils.closeResultSet(rs)
            }
        }
        return jdbcOperations.execute(prepareSql(request), convertSqlParameterSource(request), callback)
    }

    protected fun prepareSql(request: QueryRequest): String {
        return request.sql
    }

    protected fun convertSqlParameterSource(request: QueryRequest): SqlParameterSource {
        if (request.parameters == null) {
            return EmptySqlParameterSource.INSTANCE
        }
        val converter = { p: Parameter -> p.getConvertedValue(conversionService) }
        val params = request.parameters.stream()
                .collect(Collectors.toMap(Parameter::name, converter))
        return MapSqlParameterSource(params)
    }
}
