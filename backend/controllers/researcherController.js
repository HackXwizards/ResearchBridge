import { getSession } from "../database/data.js";

export const getResearchOverview = async (req, res) => {
  const session = getSession();
  try {
    const query = `
      MATCH (r:Research)
      RETURN r { .id, .title, .authors, .journal, .year, .tags, .description } AS research
    `;
    const result = await session.run(query);
    const researchList = result.records.map(record => record.get("research"));

    res.status(200).json(researchList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching research data", error: error.message });
  } finally {
    session.close();
  }
};

export const getResearchDetails = async (req, res) => {
  const session = getSession();
  try {
    const { id } = req.params;
    const query = `
      MATCH (r:Research {id: $id})
      RETURN r
    `;
    const result = await session.run(query, { id });
    const details = result.records[0]?.get("r").properties;

    if (!details) {
      return res.status(404).json({ message: "Research not found" });
    }

    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Error fetching research details", error: error.message });
  } finally {
    session.close();
  }
};

export const createResearch = async (req, res) => {
  const session = getSession();
  try {
    const { id, title, authors, journal, year, citations, tags, description, introduction, methodology, results, future_scope, references, doi } = req.body;

    const query = `
      CREATE (r:Research {
        id: $id,
        title: $title,
        authors: $authors,
        journal: $journal,
        year: $year,
        citations: $citations,
        tags: $tags,
        description: $description,
        introduction: $introduction,
        methodology: $methodology,
        results: $results,
        future_scope: $future_scope,
        references: $references,
        doi: $doi
      })
      RETURN r
    `;
    const result = await session.run(query, {
      id, title, authors, journal, year, citations, tags, description, introduction, methodology, results, future_scope, references, doi,
    });

    const createdResearch = result.records[0]?.get("r").properties;

    res.status(201).json(createdResearch);
  } catch (error) {
    res.status(500).json({ message: "Error creating research", error: error.message });
  } finally {
    session.close();
  }
};

export const searchResearch = async (req, res) => {
    const session = getSession();
    try {
      const { query, field, year } = req.query;
  
     
      let filterConditions = [];
      let params = {};
  
      if (query) {
        filterConditions.push(`(toLower(r.title) CONTAINS toLower($query) OR toLower(r.description) CONTAINS toLower($query))`);
        params.query = query;
      }
      if (field) {
        filterConditions.push(`ANY(tag IN r.tags WHERE toLower(tag) = toLower($field))`);
        params.field = field;
      }
      if (year && year !== '') {
        // Convert year to integer for comparison
        filterConditions.push(`r.year = $year`);
        params.year = parseInt(year, 10);
      }
  
      const filterQuery = filterConditions.length > 0 ? `WHERE ${filterConditions.join(" AND ")}` : "";
      const finalQuery = `
        MATCH (r:Research)
        ${filterQuery}
        RETURN r { .id, .title, .authors, .journal, .year, .tags, .description } AS research
      `;
  
  
      const result = await session.run(finalQuery, params);
      const researchList = result.records.map(record => {
        const research = record.get("research");
        return research;
      });
  
      res.status(200).json(researchList);
    } catch (error) {
      res.status(500).json({ message: "Error searching research", error: error.message });
    } finally {
      session.close();
    }
  };