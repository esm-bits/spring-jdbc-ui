package jp.co.esm.its.spring.jdbc.ui.autoconfigure;

import jp.co.esm.its.spring.jdbc.ui.QueryController;
import jp.co.esm.its.spring.jdbc.ui.QueryService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.sql.DataSource;

@Configuration
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
@ConditionalOnClass(DataSource.class)
@ConditionalOnProperty(prefix = "jp.co.esm.its.spring.jdbc.ui", name = "enabled", havingValue = "true", matchIfMissing = true)
@EnableConfigurationProperties(JdbcUiProperties.class)
public class JdbcUiAutoConfiguration {

    private static final Log logger = LogFactory.getLog(JdbcUiAutoConfiguration.class);

    @Bean
    @ConditionalOnMissingBean
    public QueryService queryService(NamedParameterJdbcOperations jdbcOperations, ConversionService conversionService) {
        return new QueryService(jdbcOperations, conversionService);
    }

    @Bean
    @ConditionalOnMissingBean
    public QueryController queryController(QueryService queryService) {
        return new QueryController(queryService);
    }

    @Configuration
    public static class JdbcUiWebMvcConfiguration implements WebMvcConfigurer {

        private final JdbcUiProperties jdbcUiProperties;

        public JdbcUiWebMvcConfiguration(JdbcUiProperties jdbcUiProperties) {
            this.jdbcUiProperties = jdbcUiProperties;
        }

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            String pathPattern = jdbcUiProperties.getPath() + "/**";
            if (!registry.hasMappingForPattern(pathPattern)) {
                registry
                  .addResourceHandler(pathPattern)
                  .addResourceLocations("classpath:/META-INF/ui/");
            }
        }
    }
}
