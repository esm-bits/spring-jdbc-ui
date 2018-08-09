package jp.co.esm.its.spring.jdbc.ui.model

import java.sql.ResultSetMetaData
import java.sql.SQLException
import java.util.ArrayList

class Column {
  var label: String? = null
  var typeName: String? = null

  companion object {

    @Throws(SQLException::class)
    fun getColumns(metaData: ResultSetMetaData): List<Column> {
      val columns = ArrayList<Column>()
      for (i in 1..metaData.getColumnCount()) {
        val column = Column()
        column.label = metaData.getColumnLabel(i)
        column.typeName = metaData.getColumnTypeName(i)
        columns.add(column)
      }
      return columns
    }
  }
}
