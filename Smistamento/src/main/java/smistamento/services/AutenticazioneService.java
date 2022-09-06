package smistamento.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import smistamento.entities.Offerente;
import smistamento.entities.Profugo;
import smistamento.entities.UserEntity;
import smistamento.repositories.UserEntityRepository;

import javax.jws.soap.SOAPBinding;


@Service
public class AutenticazioneService implements UserDetailsService {
    @Autowired
    UserEntityRepository userEntityRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userEntityRepository.findByEmail(username);
        if(user==null) throw new UsernameNotFoundException(username);
        UserDetails userDetails = null;
        if(user instanceof Profugo){
            userDetails = User.withUsername(username).password(user.getPassword()).authorities("Profugo").build();
        }
        else if (user instanceof Offerente){
            userDetails = User.withUsername(username).password(user.getPassword()).authorities("Offerente").build();
        }
        return userDetails;
    }
    public UserEntity userByUsername(String username) throws UsernameNotFoundException{
        UserEntity user = userEntityRepository.findByEmail(username);
        if (user==null) throw new UsernameNotFoundException(username);
        return user;
    }
}
