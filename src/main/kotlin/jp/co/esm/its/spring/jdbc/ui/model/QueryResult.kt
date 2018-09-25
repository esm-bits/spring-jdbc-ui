package jp.co.esm.its.spring.jdbc.ui.model

data class QueryResult(
        var updateCount: Int,
        var columns: List<Column>?,
        var resultSet: List<Map<String, Any>>?
)
