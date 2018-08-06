package jp.co.esm.its.spring.jdbc.ui.model

import org.springframework.core.convert.ConversionService
import org.springframework.util.ClassUtils


data class Parameter(val name: String, val value: String, val type: String) {

  fun getConvertedValue(conversionService: ConversionService): Any? {
    if (this.type.isEmpty()) {
      return this.value
    }
    val cls: Class<*>
    try {
      cls = ClassUtils.forName(this.type, null)
      return conversionService.convert(this.value, cls)
    } catch (e: ClassNotFoundException) {
      e.printStackTrace()
    }

    return value
  }
}
