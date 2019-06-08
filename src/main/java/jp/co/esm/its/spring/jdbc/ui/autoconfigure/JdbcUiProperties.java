package jp.co.esm.its.spring.jdbc.ui.autoconfigure;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jp.co.esm.its.spring.jdbc.ui", ignoreUnknownFields = true)
public class JdbcUiProperties {
  private boolean enabled = true;
  private String path = "/jdbc-ui";

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }
}
