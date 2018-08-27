package jp.co.esm.its.spring.jdbc.ui.model

data class QueryRequest(val sql: String, val parameters: List<Parameter>?)
