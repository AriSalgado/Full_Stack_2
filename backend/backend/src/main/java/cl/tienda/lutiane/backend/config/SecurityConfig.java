package cl.tienda.lutiane.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desactiva protección CSRF
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api/auth/**", "/productos/**", "/usuarios/**").permitAll()
                .anyRequest().permitAll()
            )
            .formLogin(form -> form.disable()) // Desactiva el login por formulario
            .httpBasic(basic -> basic.disable()); // Desactiva autenticación básica
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Password encoder bean para hashear contraseñas (BCrypt)
        // Original simple security config (no password encoder bean)
}
