#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Participation import Participation

class ParticipationMapper(Mapper):
    def __init__(self):
        pass

    def find_all(self, ):
        pass

    def find_by_id(self, ):
        pass

    def find_by_project_id(self, project_id):
        """Auslesen aller Teilnahmen eines durch Fremdschlüssel (project_id) gegebenen Projekts.

        :param project_id Schlüssel des zugehörigen Studenten.
        :return Eine Sammlung mit Teilnahme-Objekten, die sämtliche teilnahmen des
                betreffenden Studentenn repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, project_id, student_id FROM participation WHERE project_id={} ORDER BY id".format(project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, project_id, student_id) in tuples:
            p = Participation()
            p.set_id(id)
            p.set_project(project_id)
            p.set_student(student_id)
            result.append(p)
        
        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, participation):
        """Einfügen eines Participation-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param participation das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM participation ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            participation.set_id(maxid[0]+1)

        command = "INSERT INTO participation (id, creation_date, grading_id, module_id, project_id, student_id) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (participation.get_id(), participation.get_creation_date(), participation.get_grading(), participation.get_module(), participation.get_project(),  participation.get_student())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return participation



if __name__ == "__main__":

    #   with ParticipationMapper() as mapper:
    #     result = mapper.find_by_project_id(1)
    #     for p in result:
    #         print(p.get_id(), p.get_project(), p.get_student())

    p = Participation()
    p.set_id(1)
    #p.set_grading(2)
    #p.set_module(5)
    p.set_project(1)
    #p.set_student(5)

    with ParticipationMapper() as mapper:
         result = mapper.insert(p)


       

