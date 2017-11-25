package gormgraphql

import grails.rest.Resource

@Resource(uri='/talk')
//tag::graphql[]
class Talk {

    String title
    int duration

    static graphql = true
//end::graphql[]

    static belongsTo = [speaker: Speaker]
}