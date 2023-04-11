from application import logger
from cpmtools import graph_generator
from flask import Flask, jsonify, request

def create_app(config_file=None):
    app = Flask(__name__, config_file)
    return app

app = create_app()

@app.route("/api/cpm", methods=["POST"])
def get_cpm_chart():
    graph = graph_generator.generate_graph(request.json)
    try:
        img_hash = graph_generator.draw_graph(graph)
        return jsonify({"response": img_hash}), 200
    except Exception as e:
        logger.error(str(e))
        return jsonify({"error": str(e)}), 400