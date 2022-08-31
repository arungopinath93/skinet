using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public Expression<Func<T, bool>> Criteria  { get; }   // it recives the lamda experssion  for a specific object

        public List<Expression<Func<T, object>>> Includes { get; } =  new List<Expression<Func<T, object>>>(); // to include the reference object
       
        public BaseSpecification()
        {
            
        }
        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        protected void AddInclude(Expression<Func<T, object>> includeExpression){ // method to include ref object
            Includes.Add(includeExpression);
        }
    }
}