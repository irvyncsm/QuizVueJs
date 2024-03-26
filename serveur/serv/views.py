from flask import jsonify, abort, make_response,request
from .app import app
from flask import url_for
from .models import Questionnaire, Question

@app.route('/quiz/api/questionnaires', methods=['GET'])
def questionnaires():
    return jsonify(Questionnaire.get_questionnaires())

@app.route('/quiz/api/questionnaires', methods=['POST'])
def create_questionnaire():
    return jsonify(Questionnaire.create_questionnaire(request.json))

@app.route('/quiz/api/questionnaires/<int:questionnaire_id>', methods=['GET'])
def questionnaire(questionnaire_id):
    return jsonify(Questionnaire.get_questionnaire(questionnaire_id))

@app.route('/quiz/api/questionnaires/<int:questionnaire_id>', methods=['PUT'])
def update_questionnaire(questionnaire_id):
    return jsonify(Questionnaire.update_questionnaire(questionnaire_id, request.json))

@app.route('/quiz/api/questionnaires/<int:questionnaire_id>', methods=['DELETE'])
def delete_questionnaire(questionnaire_id):
    return jsonify(Questionnaire.delete_questionnaire(questionnaire_id))

@app.route('/quiz/api/questions', methods=['GET'])
def questions():
    return jsonify(Question.get_questions())

@app.route('/quiz/api/questions', methods=['POST'])
def create_question():
    return jsonify(Question.create_question(request.json))

@app.route('/quiz/api/questions/<int:question_id>', methods=['GET'])
def question(question_id):
    return jsonify(Question.get_question(question_id))

@app.route('/quiz/api/questions/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    return jsonify(Question.update_question(question_id, request.json))

@app.route('/quiz/api/questions/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    return jsonify(Question.delete_question(question_id))

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)