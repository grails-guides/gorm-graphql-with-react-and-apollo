package gormgraphql

import grails.gorm.services.Service
import groovy.transform.CompileStatic
import java.time.LocalDate

@CompileStatic
@Service(Speaker)
interface SpeakerDataService {
    Speaker save(String firstName, String lastName, LocalDate birthday, String email, String bio)
    Speaker save(String firstName, String lastName, LocalDate birthday, String email)
}