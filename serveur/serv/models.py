from flask import Flask, request, jsonify, abort, redirect, url_for
from .app import app,db
from flask_sqlalchemy import SQLAlchemy

class Questionnaire(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "<Questionnaire (%d) %s>" % (self.id, self.name)

    def get_questionnaires():
        return [q.to_json() for q in Questionnaire.query.all()]
    
    def create_questionnaire(json):
        q = Questionnaire(json['name'])
        db.session.add(q)
        db.session.commit()
        return q.to_json()

    def get_questionnaire(questionnaire_id):
        q = Questionnaire.query.get(questionnaire_id)
        if q is None:
            abort(404)
        return q.to_json()
    
    def update_questionnaire(questionnaire_id, json):
        q = Questionnaire.query.get(questionnaire_id)
        if q is None:
            abort(404)
        q.name = json['name']
        db.session.commit()
        return q.to_json()
    
    def delete_questionnaire(questionnaire_id):
        q = Questionnaire.query.get(questionnaire_id)
        if q is None:
            abort(404)
        db.session.delete(q)
        db.session.commit()
        return {"success":True, "message":"supprimé avec succès"}

    def to_json(self):
        json = {
            'url': url_for('questionnaires', questionnaire_id=self.id, _external=True), # 'http://localhost:5000/quiz/api/questionnaires/1
            'id': self.id,
            'name': self.name,
            'questions': [q.to_json() for q in self.questions]
        }
        return json


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    questionType = db.Column(db.String(120))
    questionnaire_id = db.Column(db.Integer, db.ForeignKey('questionnaire.id'))
    reponse = db.Column(db.String(120))
    questionnaire = db.relationship("Questionnaire", backref=db.backref("questions", lazy="dynamic"))
    
    __mapper_args__ = {
        'polymorphic_identity':'question',
        'with_polymorphic':'*',
        'polymorphic_on':questionType
    }
    
    def __init__(self, title, questionType, questionnaire_id):
        self.title = title
        self.questionType = questionType
        self.questionnaire_id = questionnaire_id
        
    def __repr__(self):
        return "<Question (%d) %s>" % (self.id, self.title)
    
    def get_questions():
        return [q.to_json() for q in Question.query.all()]
    
    def get_question(question_id):
        q = Question.query.get(question_id)
        if q is None:
            abort(404)
        return q.to_json()
    
    def create_question(json):
        q = json
        type_question = json['questionType']
        match type_question:
            case "unique":
                q = SimpleQuestion(json['title'], json['questionnaire_id'], json['reponse'])
            case "multiple":
                q = QuestionMultiple(json['title'], json['questionnaire_id'], json['reponse'], json['prop1'], json['prop2'])
        db.session.add(q)
        db.session.commit()
        return q.to_json()
    
    def update_question(question_id, json):
        q = Question.query.get(question_id)
        if q is None:
            abort(404)
        type = json['questionType']
        q.title = json['title']
        if type == q.questionType:
            match type:
                case "unique":
                    q.reponse = json['reponse']
                case "multiple":
                    q.reponse = json['reponse']
                    q.prop1 = json['prop1']
                    q.prop2 = json['prop2']
        db.session.commit()
        return q.to_json()
    
    def delete_question(question_id):
        q = Question.query.get(question_id)
        if q is None:
            abort(404)
        db.session.delete(q)
        db.session.commit()
        return {"success":True, "message":"supprimé avec succès"}
    
    def to_json(self):
        json = {
            'url': url_for('question', question_id=self.id, _external=True),
            'id': self.id,
            'title': self.title,
            'questionType': self.questionType,
            'questionnaire_id': self.questionnaire.id,
        }
        if isinstance(self, QuestionMultiple):
            json['reponse'] = int(self.reponse)
            json['prop1'] = self.prop1
            json['prop2'] = self.prop2
        else:
            json['reponse'] = self.reponse
        return json
    
class QuestionMultiple(Question):
    id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)
    prop1 = db.Column(db.String(120))
    prop2 = db.Column(db.String(120))
    
    __mapper_args__ = {
        'polymorphic_identity':'multiple',
        'with_polymorphic':'*',
        'polymorphic_load':'inline'
    }
    
    def __init__(self, title, questionnaire_id, reponse, prop1, prop2):
        super().__init__(title, "multiple", questionnaire_id)
        self.reponse = str(reponse)
        self.prop1 = prop1
        self.prop2 = prop2
        
    def to_json(self):
        json = super().to_json()
        return json
    
class SimpleQuestion(Question):
    id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity':'unique',
        'with_polymorphic':'*',
        'polymorphic_load':'inline'
    }
    
    def __init__(self, title, questionnaire_id, reponse):
        super().__init__(title, "unique", questionnaire_id)
        self.reponse = reponse
        
    def to_json(self):
        json = super().to_json()
        return json