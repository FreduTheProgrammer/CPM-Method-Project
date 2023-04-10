import matplotlib.pyplot as plt
import networkx as nx
from .cpm import Cpm
import uuid

def generate_graph(request):
    graph = Cpm()
    for node in request:
        graph.add_node(node["activity"], Duration=node["duration"])
    graph.add_edges_from([(predecessor, edge["activity"]) for edge in request for predecessor in edge["predecessors"]])
    return graph

def draw_graph(graph):
    critical_path = graph.critical_path
    pos = nx.nx_agraph.graphviz_layout(graph, prog='dot')
    _, ax = plt.subplots(figsize=(15, 15))
    nx.draw_networkx_nodes(graph, pos, node_size=2000, node_color='red', ax=ax, nodelist=critical_path)
    nx.draw_networkx_nodes(graph, pos, node_size=1000, node_color='seagreen', ax=ax, nodelist={node for node in graph.nodes if node not in critical_path})
    nx.draw_networkx_edges(graph, pos, edge_color='black',
                           width=1, arrowstyle='simple', arrowsize=20, min_source_margin=25, min_target_margin=25)
    nx.draw_networkx_labels(graph, pos, ax=ax, font_weight="bold",
                            font_color="black", font_size=16)
    
    for node, attributes in graph.nodes.items():
        xy = pos[node]
        text = '\n'.join(f'{k}: {v}' for k,
                         v in attributes.items())
        ax.annotate(text, xy=xy, xytext=(50, 5), textcoords="offset points",
                    bbox=dict(boxstyle="round", fc="lightgrey"),
                    arrowprops=dict(arrowstyle="wedge"))
    ax.axis('off')
    img_name = uuid.uuid4()
    plt.savefig(f"../img/{img_name}.png")
    return img_name