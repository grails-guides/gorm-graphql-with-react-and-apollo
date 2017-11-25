package gormgraphql

import grails.rest.Resource

@Resource(uri='/talk')
class Talk {

    String title
    int duration

    static graphql = true

    static belongsTo = [speaker: Speaker]
}