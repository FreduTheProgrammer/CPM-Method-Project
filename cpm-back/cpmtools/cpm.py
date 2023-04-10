import networkx as nx

class Cpm (nx.DiGraph):
    
    def __init__(self):
        super().__init__()
        self._dirty = True
        self._critical_path_length = -1
        self._criticalPath = None

    def add_node(self, *args, **kwargs):
        self._dirty = True
        super().add_node(*args, **kwargs)

    def add_nodes_from(self, *args, **kwargs):
        self._dirty = True
        super().add_nodes_from(*args, **kwargs)

    def add_edge(self, *args):  # , **kwargs):
        self._dirty = True
        super().add_edge(*args)  # , **kwargs)

    def add_edges_from(self, *args, **kwargs):
        self._dirty = True
        super().add_edges_from(*args, **kwargs)

    def remove_node(self, *args, **kwargs):
        self._dirty = True
        super().remove_node(*args, **kwargs)

    def remove_nodes_from(self, *args, **kwargs):
        self._dirty = True
        super().remove_nodes_from(*args, **kwargs)

    def remove_edge(self, *args):  # , **kwargs):
        self._dirty = True
        super().remove_edge(*args)  # , **kwargs)

    def remove_edges_from(self, *args, **kwargs):
        self._dirty = True
        super().remove_edges_from(*args, **kwargs)

    def _forward(self):
        for n in nx.topological_sort(self):
            es = max([self._node[j]['EF'] for j in self.predecessors(n)], default=0)
            self.add_node(n, ES=es, EF=es + self._node[n]["Duration"])

    def _backward(self):
        for n in list(reversed(list(nx.topological_sort(self)))):
            lf = min([self._node[j]['LS'] for j in self.successors(n)], default=self._critical_path_length)
            self.add_node(n, LS=lf - self._node[n]["Duration"], LF=lf)

    def _compute_critical_path(self):
        graph = set()
        for n in self:
            reserve =  self._node[n]['LF'] - self._node[n]['EF']
            self._node[n]["Reserve"] = reserve
            if not reserve:
                graph.add(n)
                self._node[n]["Critical"] = True
            else:
                self._node[n]["Critical"] = False
        self._criticalPath = self.subgraph(graph)

    def _add_tasks(self, critical_path):
        if self.has_node("Finish"):
            self.remove_node("Finish")
        final_task_time = self._node[critical_path[-1]]["ES"] + self._node[critical_path[-1]]["Duration"]
        self.add_node("Finish", Duration=0, ES=final_task_time, EF=final_task_time, LS=final_task_time, LF=final_task_time, Reserve=0, Critical=True)
        self.add_edge(critical_path[-1], "Finish")
        critical_path.append("Finish")

    def _connect_hanging_nodes(self):
        has_hanging_nodes = False
        for node in self._node:
            if not next(self.successors(node), None) and node != "Finish":
                has_hanging_nodes = True
                self.add_edge(node, "Finish")
        if not has_hanging_nodes:
            self.remove_node("Finish")
    @property
    def critical_path_length(self):
        if self._dirty:
            self._update()
        return self._critical_path_length

    @property
    def critical_path(self):
        if self._dirty:
            self._update()
        critical_path = sorted(self._criticalPath, key=lambda x: self._node[x]['ES'])
        self._add_tasks(critical_path)
        self._connect_hanging_nodes()
        return critical_path
    
    def compute_critical_path(self):
        return self.critical_path
    
    def get_nodes(self):
        return self._node

    def _update(self):
        self._forward()
        self._critical_path_length = max(nx.get_node_attributes(self, 'EF').values())
        self._backward()
        self._compute_critical_path()
        self._dirty = False