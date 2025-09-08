from answer_key import answer_key
from student_key import student_answers
def grade_mcq(student_answers, answer_key):
    correct = 0
    for qid, correct_answer in answer_key.items():
        student_answer = student_answers.get(qid)
        if student_answer == correct_answer:
            correct += 1
    total = len(answer_key)
    score = (correct / total) * 100
    return {
        "correct": correct,
        "total": total,
        "percentage": score
    }
result = grade_mcq(student_answers, answer_key)
print(result)
