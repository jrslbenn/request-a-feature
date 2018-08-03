function FeatureRequest(data) {
    this.id = ko.observable(data.id);
    this.title = ko.observable(data.title);
    this.description = ko.observable(data.description);
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

    $.getJSON('/featureRequests', function(featureRequestModels) {
        var t = $.map(featureRequestModels.featureRequests, function(item) {
            return new FeatureRequest(item);
        });
        self.featureRequests(t);
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
                'target_dt': self.newFeatureRequestTargetDate()
            }),
            success: function(data) {
                console.log("Pushing to featureRequests array");
                self.featureRequests.push(new FeatureRequest({
                    title: data.title,
                    description: data.description,
                    client: data.client,
                    client_priority: data.client_priority,
                    product_area: data.product_area,
                    target_dt: data.target_dt
                }));
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
