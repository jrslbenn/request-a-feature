function FeatureRequest(data) {
    this.id = ko.observable(data.id);
    this.title = ko.observable(data.title);
    this.description = ko.observable(data.description);
    this.client = ko.observable(data.client);
    this.clientPriority = ko.observable(data.client_priority);
    this.productArea = ko.observable(data.product_area);
    this.targetDt = ko.observable(data.target_dt);
    this.createdDt = ko.observable(data.created_dt);
}

function FeatureRequestListViewModel() {
    var self = this;
    self.featureRequests = ko.observableArray([]);
    self.newFeatureRequestTitle = ko.observable();
    self.newFeatureRequestDesc = ko.observable();
    self.newFeatureRequestClient = ko.observable();
    self.newFeatureRequestClientPriority = ko.observable();
    self.newFeatureRequestProductArea = ko.observable();
    self.newFeatureRequestTargetDate = ko.observable();

    self.addFeatureRequest = function() {
            self.save();
            self.newFeatureRequestTitle("");
            self.newFeatureRequestDesc("");
            self.newFeatureRequestClient("");
            self.newFeatureRequestClientPriority("");
            self.newFeatureRequestProductArea("");
            self.newFeatureRequestTargetDate("");
        };

    $.getJSON('/featureRequests', function(res) {
        var mappedRequests = $.map(res.feature_requests, function(request) {
            return new FeatureRequest(request);
        });
        self.featureRequests(mappedRequests);
    });

    self.save = function() {
        return $.ajax({
            url: '/featureRequests/new',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify({
                'title': self.newFeatureRequestTitle(),
                'description': self.newFeatureRequestDesc(),
                'client': self.newFeatureRequestClient(),
                'client_priority': self.newFeatureRequestClientPriority(),
                'product_area': self.newFeatureRequestProductArea(),
                'target_dt': self.newFeatureRequestTargetDate(),
                'created_dt': new Date()
            }),
            success: function(data) {
                let featureRequest = new FeatureRequest({
                    title: data.title,
                    description: data.description,
                    client: data.client,
                    client_priority: data.client_priority,
                    product_area: data.product_area,
                    target_dt: data.target_dt,
                    created_dt: new Date()
                });
                self.featureRequests.push(featureRequest);
                return;
            },
            error: function() {
                console.log(error);
                return console.log("Failed");
            }
        });
    };
}

ko.applyBindings(new FeatureRequestListViewModel());
