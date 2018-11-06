package jp.co.esm.its.spring.jdbc.ui.model

import java.sql.ResultSetMetaData
import java.sql.SQLException
import java.util.ArrayList

data class Column(val label: String, val typeName: String) {


  companion object {

    @Throws(SQLException::class)
    fun getColumns(metaData: ResultSetMetaData): List<Column> {
      val columns = ArrayList<Column>()
      for (i in 1..metaData.getColumnCount()) {
        val column = Column(metaData.getColumnLabel(i), metaData.getColumnTypeName(i))
        columns.add(column)
      }
      return columns
    }
  }
}
