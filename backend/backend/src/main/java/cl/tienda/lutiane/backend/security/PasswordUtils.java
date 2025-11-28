package cl.tienda.lutiane.backend.security;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

public class PasswordUtils {

    private static final Argon2 argon2 = Argon2Factory.create();

    public static String hashPassword(String password) {
        return argon2.hash(3, 65536, 1, password); 
    }

    public static boolean verifyPassword(String password, String hash) {
        return argon2.verify(hash, password); 
    }
}