package gormgraphql

import grails.gorm.services.Service
import groovy.transform.CompileStatic

@CompileStatic
@Service(Talk)
interface TalkDataService {
    Talk save(String title, int duration, Speaker speaker)
}