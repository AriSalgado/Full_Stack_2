package cl.tienda.lutiane.backend.config;

// Minimal placeholder JwtUtil to avoid compile errors when JWT is disabled.
public class JwtUtil {
    public String generateToken(String email, String role) {
        throw new UnsupportedOperationException("JWT support is disabled in this build");
    }

    public boolean validateToken(String token) {
        return false;
    }

    public String getEmailFromToken(String token) {
        return null;
    }

    public String getRoleFromToken(String token) {
        return null;
    }
}
