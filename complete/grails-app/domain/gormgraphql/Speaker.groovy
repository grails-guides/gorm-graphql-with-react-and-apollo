package gormgraphql

import grails.rest.Resource

import java.time.LocalDate

@Resource(uri='/speaker')
class Speaker {

    String firstName
    String lastName
    String name
    String email
    String bio
    LocalDate birthday

    static hasMany = [talks: Talk]

    static constraints = {
        email nullable: true, email: true
        bio nullable: true
    }

    static mapping = {
        bio type: 'text'
        name formula: 'concat(FIRST_NAME,\' \',LAST_NAME)'
        talks sort: 'id'
    }

}