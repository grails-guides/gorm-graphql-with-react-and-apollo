package gormgraphql

import groovy.util.logging.Slf4j
import java.time.LocalDate

@Slf4j
class BootStrap {

    def init = { servletContext ->

        Speaker jeff = new Speaker(firstName: "Jeff",
                lastName: "Brown",
                birthday: LocalDate.of(1975, 11, 15),
                email: "brownj@objectcomputing.com",
                bio: "Jeff Brown is an author and tech lead at OCI")


        Speaker graeme = new Speaker(firstName: "Graeme",
                lastName: "Rocher",
                birthday: LocalDate.of(1978, 1, 1),
                email: "rocherg@objectcomputing.com",
                bio: "Graeme Rocher is the tech lead for the Grails project")

        Speaker zak = new Speaker(firstName: "Zachary",
                lastName: "Klein",
                birthday: LocalDate.of(1989, 2, 23),
                email: "kleinz@objectcomputing.com")

        jeff.save()
        graeme.save()
        zak.save()

        new Talk(title: "Testing with Grails 3", duration: 90, speaker: jeff).save()
        new Talk(title: "Polyglot Development with Grails 3", duration: 90, speaker: jeff).save()
        new Talk(title: "GORM Deep Dive", duration: 120, speaker: graeme).save()
        new Talk(title: "What's New in Grails 4", duration: 60, speaker: graeme).save()
        new Talk(title: "Grails in the Wonderful World of JavaScript Frameworks", duration: 90, speaker: zak).save()
        log.info "Populating database..."

    }
    def destroy = {
    }
}
