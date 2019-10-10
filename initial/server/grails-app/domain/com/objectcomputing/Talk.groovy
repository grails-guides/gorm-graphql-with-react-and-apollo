package com.objectcomputing

import grails.rest.Resource

@Resource(uri='/talk')
class Talk {

    String title
    int duration

    static belongsTo = [speaker: Speaker]
}