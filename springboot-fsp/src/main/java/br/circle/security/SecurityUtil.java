package br.circle.security;

import java.util.Date;

import br.circle.config.AppProperties;
import br.circle.config.SpringApplicationContext;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

public class SecurityUtil {
	public static final long EXPIRATION_EMAIL_TIME = 1000*60*60*2; // 2 HORAS
    public static final long EXPIRATION_TIME = 7200000; // 2 HORAS
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    
    public static String getTokenSecret(){
    	AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("appProperties");
    	
    	return appProperties.getTokenSecret();
    }
    
    public static short expirationEmailTimeInHours() {
    	return (short) (EXPIRATION_EMAIL_TIME / (double) (1000 * 60 * 60));
    }
    
    public static String extractUserInfo(String token) {
        token = token.replace(TOKEN_PREFIX, "");
        
        String user = Jwts.parser()
                .setSigningKey(getTokenSecret())
                .parseClaimsJws( token )
                .getBody()	
                .getSubject();
        
        return user;
    }
    
    public static Claims extractAuthorities(String token) {
        token = token.replace(TOKEN_PREFIX, "");
        
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(getTokenSecret())
                .parseClaimsJws(token);
        
        return claims.getBody();
    }

    public static boolean hasTokenExpired(String token) {
    	token = token.replace(TOKEN_PREFIX, "");
    	
        Claims claims = Jwts.parser()
        		.setSigningKey(getTokenSecret())
        		.parseClaimsJws(token).getBody();
    		
        Date tokenExpirationDate = claims.getExpiration();
        Date today = new Date();
    		
        return tokenExpirationDate.before(today);
    }
    
}
