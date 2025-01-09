import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Users2 } from "lucide-react";
import { publicationService } from "@/services/publicationService";
import { motion } from "framer-motion";

interface DetailedPublication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  citations: number;
  tags: string[];
  description: string;
  doi: string;
  introduction: string;
  methodology: string;
  results: string;
  future_scope: string;
  references: string[];
}

const PublicationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [publication, setPublication] = useState<DetailedPublication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicationDetails = async () => {
      try {
        if (!id) return;
        const data = await publicationService.getPublicationDetails(id);
        setPublication(data);
      } catch (err) {
        setError("Failed to fetch publication details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicationDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="min-h-screen p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error || "Publication not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8 mt-20">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-gray-100 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Publications
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{publication.title}</h1>

            {/* Authors and Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Authors</h3>
                <p className="text-gray-900">{publication.authors.join(', ')}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Journal</h3>
                <p className="text-gray-900">{publication.journal}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Year</h3>
                <p className="text-gray-900">{publication.year}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Citations</h3>
                <p className="text-gray-900">{publication.citations}</p>
              </div>
            </div>

            {/* Tags */}
            {publication.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {publication.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8"
        >
          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Abstract</h2>
            <p className="text-gray-700 leading-relaxed">{publication.description}</p>
          </div>

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">{publication.introduction}</p>
          </div>

          {/* Methodology */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Methodology</h2>
            <p className="text-gray-700 leading-relaxed">{publication.methodology}</p>
          </div>

          {/* Results */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Results</h2>
            <p className="text-gray-700 leading-relaxed">{publication.results}</p>
          </div>

          {/* Future Scope */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Future Scope</h2>
            <p className="text-gray-700 leading-relaxed">{publication.future_scope}</p>
          </div>

          {/* References */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">References</h2>
            <ul className="list-disc pl-6 space-y-3">
              {publication.references.map((reference, index) => (
                <li key={index} className="text-gray-700">{reference}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            {publication.doi && (
              <Button
                variant="outline"
                onClick={() => window.open(publication.doi, '_blank')}
                className="hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Original Paper
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Collaboration CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="fixed bottom-8 right-8"
      >
        <Button
          onClick={() => navigate('/collaboration')}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-6"
        >
          <Users2 className="h-5 w-5 mr-2" />
          Collaborate on this Project
        </Button>
      </motion.div>
    </div>
  );
};

export default PublicationDetailsPage;