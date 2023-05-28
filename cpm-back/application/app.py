from application import logger
from cpmtools import graph_generator
from middlemantools import middleman
from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
import json
from flask import send_from_directory

def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={r"/*":{"origins": "*"}})
    return app

app = create_app()

@app.route("/api/cpm", methods=["POST"])
def get_cpm_chart():
    graph = graph_generator.generate_graph(request.json)
    try:
        img_hash = graph_generator.draw_graph(graph)
        return jsonify({
            "response": url_for('static', filename=f"{img_hash}.png"),
            "activities": [{"Name": name, 
                            "Predecessors": [p_name for p_name in graph.predecessors(name)], **val} 
                            for name, val in graph._node.items() if name != "Finish"]
            }), 200
    except Exception as e:
        logger.error(str(e))
        return jsonify({"error": str(e)}), 400




@app.route("/api/middleman", methods=["POST"])
def get_middleman_data():
    response_object = middleman.middlemansolver(request.json["suppliers"], request.json["customers"])
    print(response_object)
    try:
        return jsonify({
            "response": {
                "Total_cost": response_object[2],
                "Income": response_object[3],
                "Profit": response_object[4],
                "Individualprofits": response_object[0],
                "Optimaltransport": response_object[1]
            }
        })
    except Exception as e:
        logger.error(str(e))
        return jsonify({"error": str(e)}), 400