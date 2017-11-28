package gormgraphql

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j

import java.time.LocalDate

@Slf4j
@CompileStatic
class BootStrap {

    SpeakerDataService speakerDataService

    TalkDataService talkDataService

    def init = { servletContext ->
        log.info "Populating database..."

        Speaker jeff = speakerDataService.save('Jeff', 'Brown', LocalDate.of(1975, 11, 15), 'brownj@objectcomputing.com', 'Jeff Brown is an author and tech lead at OCI')
        Speaker graeme = speakerDataService.save('Graeme', 'Rocher', LocalDate.of(1978, 1, 1), 'rocherg@objectcomputing.com', 'Graeme Rocher is the tech lead for the Grails project')
        Speaker zak = speakerDataService.save('Zachary', 'Klein', LocalDate.of(1989, 2, 23), 'kleinz@objectcomputing.com')

        talkDataService.save('Testing with Grails 3', 90, jeff)
        talkDataService.save('Polyglot Development with Grails 3', 90, jeff)
        talkDataService.save('GORM Deep Dive', 120, graeme)
        talkDataService.save("What's New in Grails 4", 60, graeme)
        talkDataService.save('Grails in the Wonderful World of JavaScript Frameworks', 90, zak)

    }
    def destroy = {
    }
}
