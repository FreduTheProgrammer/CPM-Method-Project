from application import logger
from cpmtools import graph_generator
from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
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